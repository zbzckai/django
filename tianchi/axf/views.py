from django.shortcuts import render
from .models import Wheel, Nav, test_table
from django.forms.models import model_to_dict
from django.core import serializers
import json
import pandas as pd
from django.http import HttpResponse

from data_static import student_select
# Create your views here.

def jsdaoru(request):
    wheelsList = Wheel.objects.all()
    name = list(Wheel.objects.values_list('name', flat=True))
    data = list(Wheel.objects.values_list('trackid', flat=True))
    return render(request, 'axf/js_daoru.html', {"wheelsList": wheelsList, "name": name, "data": data})





def index(request):
    StudentID = int(request.POST.get("UserName",'15672'))
    grade = request.POST.get("grade")
    mes_sub_name = request.POST.get("subject",'物理')
    other = request.POST.getlist("other")
    user_1_everysub, student_info, mes_sub_name = student_select(StudentID=StudentID, mes_sub_name=mes_sub_name)
    if mes_sub_name == 0:
        return HttpResponse("您输入的学生或课程未查询到，请检查后重新输入！")
    exam_numname = list(user_1_everysub.exam_numname)
    mes_T_Score = list(user_1_everysub.mes_T_Score)
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
    subject_list = ['政治', '技术', '数学', '语文', '英语', '地理', '历史', '物理', '化学', '生物', '音乐',
                    '体育', '通用技术', '美术', '1B模块总分', '信息技术']

    print(exam_numname)
    return render(request, 'axf/index.html',
                  {"StudentName": student_info.bf_Name.values[0], "mes_sub_name": mes_sub_name, "StudentID":
                      student_info.bf_StudentID.values[0], "exam_numname": exam_numname, "mes_T_Score": mes_T_Score,
                   "student_info_name": student_info_name, "student_info_value": student_info_value,
                   "subject_list": subject_list})


def select_stu(request):
    user_1_everysub = student_select(StudentID=15672, mes_sub_name='物理')
    exam_numname = list(user_1_everysub.exam_numname)
    mes_T_Score = list(user_1_everysub.mes_T_Score)
    print(mes_T_Score)
    return render(request, 'axf/select_stu.html', {"exam_numname": exam_numname, "mes_T_Score": mes_T_Score})


def regist(request):
    StudentID = int(request.POST.get("UserName"))
    grade = request.POST.get("grade")
    mes_sub_name = request.POST.get("subject")
    other = request.POST.getlist("other")
    user_1_everysub, student_info, mes_sub_name = student_select(StudentID=StudentID, mes_sub_name=mes_sub_name)
    user_1_everysub.shape
    if mes_sub_name == 0:
        return HttpResponse("您输入的学生或课程未查询到，请检查后重新输入！")
    exam_numname = list(user_1_everysub.exam_numname)
    mes_T_Score = list(user_1_everysub.mes_T_Score)
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
    subject_list = ['政治', '技术', '数学', '语文', '英语', '地理', '历史', '物理', '化学', '生物', '音乐',
                    '体育', '通用技术', '美术', '1B模块总分', '信息技术']

    print(exam_numname)
    return render(request, 'axf/index.html',
                  {"StudentName": student_info.bf_Name.values[0], "mes_sub_name": mes_sub_name, "StudentID":
                      student_info.bf_StudentID.values[0], "exam_numname": exam_numname, "mes_T_Score": mes_T_Score,
                   "student_info_name": student_info_name, "student_info_value": student_info_value,
                   "subject_list": subject_list})


##测试专用
def home(request):
    List = ['自强学堂', '渲染Json到模板']
    Dict = {'site': [1,2,3,4], 'author': [5,6,7,8]}
    exam_numname = [3,4,5,6]
    mes_T_Score = [1,2,3,4]
    return render(request, 'axf/home.html', {
            'List': json.dumps(List),
            'Dict': json.dumps(Dict),
        'exam_numname':exam_numname,
        'mes_T_Score':mes_T_Score
        })

##测试专用
def add(request):
    List = ['自强学堂', '渲染Json到模板']
    Dict = {'site': [1,2,3,4], 'author': [5,6,7,8]}
    exam_numname = [3,4,5,6]
    mes_T_Score = [1,2,3,4]
    return render(request, 'axf/add.html')