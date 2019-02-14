# -*- coding: utf-8 -*-
# @Time    : 2019\2\11 0011 12:09
# @Author  : 凯
# @File    : urls.py
from django.conf.urls import url,include
from . import views

urlpatterns = [
    url(r'^$',views.index),
    url(r'^grades/(\d+)$', views.gradesStudents),
    url(r'^stu/(\d+)$', views.stupage),
    url(r'^grades/', views.grades),
    url(r'^students/', views.students),
    url(r'^students2/', views.students2),
    url(r'^addstudent/', views.addstudent),
    url(r'^addstudent2/', views.addstudent2),
    url(r'^studentsearch/', views.studentsearch),
    url(r'^grades1/', views.grades1),
]