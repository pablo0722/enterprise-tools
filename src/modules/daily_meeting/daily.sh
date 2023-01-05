#!/bin/bash

#First Parameter parser
case "$1" in
	famp)
	;;
	lisa)
	;;
	shed)
	;;
	shvs)
	;;
	escalation)
    ;;
  *)
    echo $"Usage: $0 {famp|lisa|shed|escalation}"
    exit 1
esac
	dir_base='scrum_countdown'
	dir_py=$dir_base'/.'
	dir_res=$dir_base'/resources/'$1
	PYTHONIOENCODING=utf-8 python3 $dir_py/scrum_countdown.py $dir_res/participants.txt $dir_res/information.txt $dir_res/pendings.txt $dir_res/criticals.txt
