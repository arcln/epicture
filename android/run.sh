#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n com.achaloin.epicture/host.exp.exponent.MainActivity
