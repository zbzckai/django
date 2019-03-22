from django.shortcuts import render
from .models import Wheel, Nav, test_table
from django.forms.models import model_to_dict
from django.core import serializers
import json
import pandas as pd
from django.http import HttpResponse

from data_static import *


# Create your views here.

def jsdaoru(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request, 'axf/js_daoru.html', {"wheelsList": wheelsList, "name": name, "data": data})


def index(request):
    StudentID = int(request.POST.get("StudentID", '15672'))
    print(StudentID)
    grade = request.POST.get("grade")
    mes_sub_name = request.POST.get("subject", '物理')
    other = request.POST.getlist("other")
    student_info, all_cla_name = student_info_desc(StudentID)
    table_1_series, subject_all, exam_name = student_info_chengji(StudentID=StudentID, mes_sub_name=mes_sub_name,score='mes_Score')
    table_1_series_rank = student_info_chengji(StudentID=StudentID, mes_sub_name=mes_sub_name,
                                                                  score='mes_Score_rank')[0]
    consumption_1_series, kind_all, days_7 = student_consumption_desc(StudentID=StudentID)
    if mes_sub_name == 0:
        return HttpResponse("您输入的学生或课程未查询到，请检查后重新输入！")
    student_info_name = [
        '性别'
        , '民族'
        , '出生日期'
        , '班级名'
        , '家庭住址'
        , '家庭类型'
        , '政治面貌'
        , '班级ID'
        , '班级学期'
        , '是否住校'
        , '是否退学'
        , '宿舍号']
    student_info_value = list(student_info.values[0])[2:]
    return render(request, 'axf/index.html',
                  {"StudentName": student_info.bf_Name.values[0],'table_1_series_rank':json.dumps(table_1_series_rank), 'cla_Name': student_info.cla_Name.values[0],
                   'all_cla_name':all_cla_name, "mes_sub_name": mes_sub_name, "StudentID":
                       student_info.bf_StudentID.values[0],
                   "student_info_name": student_info_name, "student_info_value": student_info_value,
                   "table_1_series": json.dumps(table_1_series), "subject_all": json.dumps(subject_all),
                   "exam_name": json.dumps(exam_name),"consumption_1_series":json.dumps(consumption_1_series),"kind_all": json.dumps(kind_all),"days_7": json.dumps(days_7)})



##测试专用
def home(request):
    List = ['自强学堂', '渲染Json到模板']
    Dict = {'site': [1, 2, 3, 4], 'author': [5, 6, 7, 8]}
    exam_numname = [3, 4, 5, 6]
    mes_T_Score = [1, 2, 3, 4]
    return render(request, 'axf/home.html', {
        'List': json.dumps(List),
        'Dict': json.dumps(Dict),
        'exam_numname': exam_numname,
        'mes_T_Score': mes_T_Score
    })


##测试专用
def add(request):
    List = ['自强学堂', '渲染Json到模板']
    Dict = {'site': [1, 2, 3, 4], 'author': [5, 6, 7, 8]}
    exam_numname = [3, 4, 5, 6]
    mes_T_Score = [1, 2, 3, 4]
    return render(request, 'axf/add.html')
