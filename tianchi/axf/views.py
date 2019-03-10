from django.shortcuts import render
from .models import Wheel, Nav, test_table
from django.forms.models import model_to_dict
from django.core import serializers
import json
import pandas as pd
from django.http import HttpResponse


# Create your views here.
def home(request):
    wheelsList = Wheel.objects.all()
    navList = Nav.objects.all()
    print('sssssss')
    print(wheelsList)
    return render(request, 'axf/home.html', {'title': '主页', 'wheelsList': wheelsList, 'navList': navList})


def market(request):
    return render(request, 'axf/market.html', {'title': '超时'})





def mine(request):
    return render(request, 'axf/mine.html', {'title': '我的'})


def echarts(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request, 'axf/echarts1.html', {"wheelsList": wheelsList, "name": name, "data": data})


def jsdaoru(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request, 'axf/js_daoru.html', {"wheelsList": wheelsList, "name": name, "data": data})


from data_static import student_select


def index(request):
    user_1_everysub = student_select(StudentID=15672, StudentName='丁某某', mes_sub_name='物理')
    exam_numname = list(user_1_everysub.exam_numname)
    mes_T_Score = list(user_1_everysub.mes_T_Score)
    print(mes_T_Score)
    return render(request, 'axf/index.html', {"exam_numname": exam_numname, "mes_T_Score": mes_T_Score})
def select_stu(request):
    user_1_everysub = student_select(StudentID=15672, StudentName='丁某某', mes_sub_name='物理')
    exam_numname = list(user_1_everysub.exam_numname)
    mes_T_Score = list(user_1_everysub.mes_T_Score)
    print(mes_T_Score)
    return render(request, 'axf/select_stu.html', {"exam_numname": exam_numname, "mes_T_Score": mes_T_Score})
