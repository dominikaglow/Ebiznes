FROM ubuntu:22.04

RUN apt-get update && \
    apt-get install -y \
    vim git \
    software-properties-common \
    curl zip unzip \
    openjdk-8-jdk \
    && rm -rf /var/lib/apt/lists/*


RUN curl https://pyenv.run | bash

RUN echo "Europe/Warsaw" > /etc/timezone && \
    apt-get update && \
    DEBIAN_FRONTEND="noninteractive" apt-get install -y tzdata && \
    apt-get install -y \
    make \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    llvm \
    libncurses5-dev \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    libffi-dev \
    liblzma-dev \
    python3-openssl \
    && rm -rf /var/lib/apt/lists/*

ENV PYENV_ROOT="/root/.pyenv"
ENV PATH="$PYENV_ROOT/bin:$PYENV_ROOT/shims:$PATH"

RUN pyenv install 3.8.0 && \
    pyenv global 3.8.0

RUN curl -s "https://get.sdkman.io" | bash && \
    bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install kotlin"
