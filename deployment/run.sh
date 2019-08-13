#!/bin/sh

# variables
tempfolder=".devnix.tmp"
container_name="devnix"
container_workdir="/devnix"
container_volume_mountpoint="/devnix"
container_statefile="localstate.nixops"

# cleanup code
function finish {
    rm -rf "$tempfolder"
}

trap finish EXIT

# check dependencies
if ! which docker > /dev/null 2>&1 ; then
    echo -e "\e[31;1mError: failed to detect docker.\e[0m"
    echo -e "\e[37mDocker is a dependency of this script, please make sure its installed.\e[0m"
    echo -e "\e[37mYou can get docker from: \e[1mhttps://docker.com/\e[0m"
    exit 1
fi

if ! which git > /dev/null 2>&1 ; then
    echo -e "\e[31;1mError: failed to detect git.\e[0m"
    echo -e "\e[37mgit is a dependency of this script, please make sure its installed.\e[0m"
    echo -e "\e[37mYou can get git from: \e[1mhttps://git-scm.com/\e[0m"
    exit 1
fi

DOCKER_FILE=$(cat <<-END
FROM nixos/nix@sha256:4b5a073e444c6f9e3944e00c9ab4ecc2e176d328b5ec0a0c05638542da401531
ENV TERM linux
ENV NIXOPS_STATE=localstate.nixops

WORKDIR $container_workdir

RUN nix-env -iA nixpkgs.nixops

CMD while :; do :; sleep 9999; done;
END
)

# things to print
HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 COMMAND [OPTIONS]

  nixops docker script. Run "$0 init" to get started.

  \e[1mCommands: \e[0m
   init:           download the dependencies and take the user trough configuration
   docker:         run docker commands
   nixops:         forward commands to nixops
   list:           list deployments
   deploy: [name]  deploy [name]
   up:     [name]  create and or deploy [name]
   create: [name]  create deployment [name]
   help:           echo this output
   help [command]: subcommand help

  \e[1mAliases: \e[0m
   list: ls
   rm:   destroy
END
)

NIXOPS_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 nixops COMMAND [OPTIONS]

    starts the container if not already running, otherwise short for
    docker exec devnix nixops [OPTIONS]

  \e[1mCommands: \e[0m
   *:         forward command to the nixops executable
END
)
# help:      echo this output
# create:    create a deployment from a given .nix file
# deploy:    deploy a deployment

DOCKER_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker COMMAND [OPTIONS]

   run docker commands for managing the containers, most likely you wont need
   this and just want to run everything though the nixops subcommand.

  \e[1mCommands: \e[0m
   help:           echo this output
   help [command]: subcommand help
   build:          make the image from the docker file (can be used to rebuild)
   create:         make the container from the image
   make:           both build and create
   exec:           execute in devnix container
   start:          start the container (interactive)
   attach:         attach to the running container (interactive)
   ls:             list containers
   stop:           stop container
   rm:             rm container
END
)

DOCKER_BUILD_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker build COMMAND [OPTIONS]

   you likely want to update (or install) the container and the image, if so run:
   "$0 docker make"

   build docker file specified, if none builds ./Dockerfile.
   This command fails if no docker file is supplied trough either default or
   the -f option. You can use -a to append any extra commands or run docker
   build directly for full control.


  \e[1mOptions: \e[0m
   -f:      Docker context
   -t:      Specify image name
   -a:      Append extra flags to the defaults
END
)

DOCKER_CREATE_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker build COMMAND [OPTIONS]

   you likely want to update (or install) the container and the image, if so run:
   "$0 docker make"

   create a container of the devnix-image image, if you have already build it.

  \e[1mOptions: \e[0m
   -n:      Specify container name
   -t:      Specify image name
   -a:      Append extra flags to the defaults
END
)

DOCKER_MAKE_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker make COMMAND [OPTIONS]

   Builds the Dockerfile and makes a container.

  \e[1mOptions: \e[0m
   -f:      Force (close running containers and overwrite existing)
END
)

DOCKER_START_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker start COMMAND [OPTIONS]

   start the nixops container

END
)

DOCKER_KILL_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker kill COMMAND [OPTIONS]


  \e[1mCommands: \e[0m
   help:    echo this output
   all:     kill all inactive containers (if -f, kills all)

  \e[1mOptions: \e[0m
   -f:    force kill
END
)

DOCKER_LIST_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker list COMMAND [OPTIONS]
   list all running containers

  \e[1mOptions: \e[0m
   -a:    list all
END
)

DOCKER_STOP_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker stop COMMAND [OPTIONS]

  \e[1mCommands: \e[0m
   help:    echo this output
   all:     stop all inactive containers (if -f, stop all)

  \e[1mOptions: \e[0m
   -f:    force stop
END
)

DOCKER_REMOVE_HELP=$(cat <<-END

  \e[1mUsage:\e[0m  $0 docker rm COMMAND [OPTIONS]


  \e[1mCommands: \e[0m
   help:    echo this output
   all:     remove all inactive containers (if -f, removes all)

  \e[1mOptions: \e[0m
   -f:    force remove
END
           )

function usage()
{
    echo -e "$HELP"
    exit 0
}

if [ $# -lt 1 ]
then
    usage
fi

function docker_stop()
{
    case "$1" in
        all)
            for id in $(docker container ls -a --format {{.ID}}); do
                docker container stop $id
            done
            ;;
        nix)
            docker container stop devnix
            ;;
        devnix)
            docker container stop devnix
            ;;
        *)
            echo -e "\e[31mNo valid target\e[0m$DOCKER_STOP_HELP"
            exit 0
            ;;
    esac
}

function docker_ls()
{
    docker ps -a --no-trunc
    exit 0
}

function docker_start()
{
    docker start devnix
    return 0
}

function docker_run()
{
    if [ $3 ]; then
        argv=( "$@" )
        docker run -i devnix-image "${argv[@]:2}";
        exit 0
    fi

    docker run -i devnix-image
    exit 0
}

function docker_make()
{
    if [ $# -gt 0 ]; then
        if [ $1 == "-f" ]; then
            echo "Stopping existing container"
            docker container stop devnix 1> /dev/null
            echo "[ok]"
            echo "Removing existing container"
            docker container rm devnix 1> /dev/null
            echo "[ok]"
        fi
    fi
    if [ $2 ] && [ $2 == "-z" ]; then
        docker_build -a --no-cache
    else
        docker_build
    fi
    docker_create
    return 0
}
function docker_create()
{
    if [ $# -lt 3 ]; then
        _docker_create devnix devnix-image
        return 0;
    fi

    case "$3" in
        -a)
            if [ ! $4 ]; then
                echo -e "\e[31m  Option $3 requires an argument!\e[0m$DOCKER_CREATE_HELP"
                exit 1
            fi
            _docker_create devnix devnix-image $4
            return 0
        ;;
        -n)
            if [ ! $4 ]; then
                echo -e "\e[31m  Option $3 requires an argument!\e[0m$DOCKER_CREATE_HELP"
                exit 1
            fi
            if [ ! $5 ]; then
                if [ ! $6 ]; then
                    echo -e "\e[31m  Option $5 requires an argument!\e[0m$DOCKER_CREATE_HELP"
                    exit 1
                fi
                _docker_create $4 $6
                return 0
            fi
            _docker_create $4 devnix-image
            return 0
            ;;
        -f)
            if [ ! $4 ]; then
                echo -e "\e[31m  Option $3 requires an argument!\e[0m$DOCKER_CREATE_HELP"
                exit 1
            fi
            if [ ! $5 ]; then
                if [ ! $6 ]; then
                    echo -e "\e[31m  Option $5 requires an argument!\e[0m$DOCKER_CREATE_HELP"
                    exit 1
                fi
                _docker_create $4 $6
                return 0
            fi
            _docker_create devnix $4
            ;;
        *)
            echo -e "\e[31m  invalid option \"$3\"!\e[0m$DOCKER_CREATE_HELP"
            ;;
    esac

    return 0
}

function _docker_create()
{
    docker create --mount type=bind,source=$(pwd),destination=$container_volume_mountpoint --name $@
}

function docker_build()
{

    # make the temp dir, if it already exists something is wrong
    mkdir "$tempfolder"
    echo "$DOCKER_FILE" > "$tempfolder/Dockerfile"

    if [ $# -lt 1 ]; then
        docker build -t devnix-image "$tempfolder"
        return 0;
    fi

    case "$1" in
        -a)
            if [ ! $2 ]; then
                echo -e "\e[31m  Option $1 requires an argument!\e[0m$DOCKER_BUILD_HELP"
                exit 1
            fi
            docker build -t devnix-image "$tempfolder" $2
            return 0
        ;;
        -t)
            if [ ! $2 ]; then
                echo -e "\e[31m  Option $1 requires an argument!\e[0m$DOCKER_BUILD_HELP"
                exit 1
            fi
            if [ ! $3 ]; then
                if [ ! $4 ]; then
                    echo -e "\e[31m  Option $3 requires an argument!\e[0m$DOCKER_BUILD_HELP"
                    exit 1
                fi
                docker build -t $2 $4
                return 0
            fi
            docker build -t $2 "$tempfolder"
            return 0
            ;;
        -f)
            if [ ! $2 ]; then
                echo -e "\e[31m  Option $1 requires an argument!\e[0m$DOCKER_BUILD_HELP"
                exit 1
            fi
            if [ ! $3 ]; then
                if [ ! $4 ]; then
                    echo -e "\e[31m  Option $3 requires an argument!\e[0m$DOCKER_BUILD_HELP"
                    exit 1
                fi
                docker build -t $4 $2
                return 0
            fi
            docker build -t devnix-image $2
            return 0
            ;;
        *)
            echo -e "\e[31m  invalid option \"$1\"!\e[0m$DOCKER_BUILD_HELP"
            ;;
    esac

    return 0
}

function docker_kill()
{
    case "$1" in
        all)
            for id in $(docker container ls -a --format {{.ID}}); do
                docker container kill $id
            done
            ;;
        *)
            echo -e "\e[31mNo valid target\e[0m$DOCKER_KILL_HELP"
            exit 0
            ;;
    esac
}

function docker_rm()
{
    case "$1" in
        all)
            for id in $(docker container ls -a --format {{.ID}}); do
                docker container rm $id
            done
            ;;
        nix)
            docker container rm devnix
            ;;
        devnix)
            docker container rm devnix
            ;;
        *)
            echo -e "\e[31mNo valid target\e[0m$DOCKER_REMOVE_HELP"
            exit 0
            ;;
    esac
}

function docker_help()
{
    if [ ! $1 ]; then
        echo -e "$DOCKER_HELP"
        exit 0
    fi

    case "$1" in
        rm)
            echo -e "$DOCKER_REMOVE_HELP"
            ;;
        ls)
            echo -e "$DOCKER_LIST_HELP"
            ;;
        build)
            echo -e "$DOCKER_BUILD_HELP"
            ;;
        help)
            echo -e "$DOCKER_HELP"
            ;;
        kill)
            echo -e "$DOCKER_KILL_HELP"
            ;;
        *)
            echo -e "  \e[31m$1 is not a command!\e[0m$DOCKER_HELP"
            exit 1
            ;;
    esac
    exit 0
}

function help()
{

    if [ ! $1 ]; then
        echo -e "$HELP"
        exit 0
    fi

    case "$1" in
        nixops)
            echo -e "$NIXOPS_HELP"
            ;;
        help)
            echo -e "$HELP"
            ;;
        docker)
            echo -e "$DOCKER_HELP"
            ;;
        *)
            echo -e "  \e[31m$1 is not a command!\e[0m$HELP"
            exit 1
            ;;
    esac
    exit 0
}

function _docker()
{
    case "$2" in
        help)
            docker_help $3
            ;;
        ls)
            docker_ls $3
            ;;
        list)
            docker_ls
            ;;
        remove)
            docker_rm $3
            ;;
        rm)
            docker_rm $3
            ;;
        start)
            docker_start $@
            ;;
        run)
            docker_run $@
            ;;
        kill)
            docker_kill $3
            ;;
        exec)
            docker exec devnix ${@:3}
            ;;
        build)
            docker_build ${@:3}
            ;;
        create)
            docker_create $@
            ;;
        make)
            docker_make ${@:3}
            ;;
        stop)
            docker_stop $3
            ;;
        *)
            echo -e "  \e[31m$2 is not a command!\e[0m$DOCKER_HELP"
            exit 1
            ;;
    esac
    exit 0
}

function docker_start_if_not_running() {
    if [ ! "$(docker inspect -f '{{.State.Running}}' $container_name)" == "true" ]; then
        docker_start
    fi
    return 0
}

function _nixops()
{
    docker_start_if_not_running
    exec_nixops $@
}

function exec_nixops()
{
    docker exec devnix nixops $1 -s $devnix_statefile/$container_statefile ${@:2}
}

function statefile()
{
    docker_start_if_not_running
    docker exec devnix nixops $@
}

function up()
{
    docker_start_if_not_running
    exec_nixops create . -d default
    exec_nixops deploy -d default
}

function destroy()
{
    if [ ! $1 ]; then
        echo "Please specify deployment name"
        return 1
    fi
    docker_start_if_not_running
    exec_nixops destroy -d $1 ${@:2} 2> /dev/null
    exec_nixops delete -d $1 ${@:2} 2> /dev/null
}

function deploy()
{
    if [ ! $1 ]; then
        echo "Please specify deployment name"
        return 1
    fi
    docker_start_if_not_running
    exec_nixops deploy -d $1 ${@:2}
}

function git_sync() {
    dir=$(pwd)
    cd $(tail -n 1 ./.devnix_config)
    git push
    git pull
    cd dir
}

function git_push_state() {
    dir=$(pwd)
    git add .
    git commit -m "push_state"
    git push
    cd dir
}

function create()
{
    if [ ! $1 ]; then
        echo "Please specify deployment name"
        return 1
    fi
    # git_sync
    docker_start_if_not_running
    exec_nixops create . -d $1 ${@:2}
}

function list()
{
    docker_start_if_not_running
    exec_nixops list $@
}

function up()
{
    if [ ! $1 ]; then
        echo "Please specify deployment name"
        return 1
    fi
    echo -e "\e[1minitializing"
    docker_start_if_not_running
    exec_nixops deploy -d $1 ${@:2}
    echo -e "\e[34m[ok]\e[0m"
}

function init()
{
    if [ -f ".devnix" ]; then
        read -p 'config file exists, are you sure? ' sure
        if [ ! $sure ]; then
            exit 0
        fi
        case "$sure" in
            no)
                exit 0
            ;;
            n)
                exit 0
            ;;
            false)
                exit 0
            ;;
        esac
    fi

    if [ $1 ] && [ $1 == "-f" ]; then
        while [ ! $flag ]; do
            read -p 'warning this will delete everything! type "consent" to continue: ' force
            if [ $force ] && [ $force == "consent" ]; then
                flag=1
            fi
        done
        printf "\e[1mstopping docker container... \e[0m"
        docker_stop devnix 1> /dev/null
        printf "\e[1mdeleting docker container... \e[0m"
        docker_rm devnix 1> /dev/null
    else
        set -e
    fi

    echo -e "\e[1minitializing\e[0m"
    printf "\e[1mbuilding docker image... \e[0m"
    docker_make 1> /dev/null
    printf "\e[32m[ok]\e[0m\n"
    printf "\e[1mstarting docker container... \e[0m"
    docker_start 1> /dev/null
    printf "\e[32m[ok]\e[0m\n"
    read -p 'please provide the path to the desired folder for your statefile. (default=.): ' statefile
    printf "\e[1mcreating config file... \e[0m"
    if [ $statefile ]; then
        echo "export devnix_statefile=$statefile" > .devnix
    else
        echo "export devnix_statefile=." > .devnix
    fi
    printf "\e[32m[ok]\e[0m\n"
    echo -e "\e[32mdone\e[0m"
}

if [ ! -f ".devnix" ]; then
    if [ $1 == "init" ]; then
        init ${@:2}
    else
        echo -e "\e[1mno devnix configuration file detected, please run \"$0 init\" to generate one\e[0m"
        exit 0
    fi
fi

source ./.devnix

case "$1" in
    help)
        help $2
        ;;
    docker)
        _docker $@
        ;;
    nixops)
        _nixops ${@:2}
        ;;
    deploy)
        deploy ${@:2}
        ;;
    create)
        create ${@:2}
        ;;
    up)
        up ${@:2}
        ;;
    destroy)
        destroy ${@:2}
        ;;
    list)
        list ${@:2}
        ;;
    init)
        init ${@:2}
        ;;
    *)
        echo -e "  \e[31m$1 is not a command!\e[0m$HELP"
        exit 1
        ;;
esac
