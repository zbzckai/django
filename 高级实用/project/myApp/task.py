# -*- coding: utf-8 -*-
# @Time    : 2019\2\19 0019 16:04
# @Author  : 凯
# @File    : task.py
#将耗时的任务卸载这里面
import time
from celery import shared_task
@shared_task
def suck():
    print('sunck is a good man ')
    time.sleep(5)
    print('sunck is a nice man')