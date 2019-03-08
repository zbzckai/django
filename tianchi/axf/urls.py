# -*- coding: utf-8 -*-
# @Time    : 2019\2\20 0020 9:34
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url
from . import views
app_name='axf'
urlpatterns = [

    url(r'^index/$', views.index, name='market'),

]
