# -*- coding: utf-8 -*-
# @Time    : 2019\2\19 0019 15:48
# @Author  : 凯
# @File    : celery.py.py
from __future__ import absolute_import
import os
from celery import Celery
from django.conf import settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE','whthas_home.settings')
app = Celery('portal')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda :settings.INSTALLED_APPS)

@app.task(bind = True)
def debug_task(self):
    print('Request:{0!r}'.format(self.request))