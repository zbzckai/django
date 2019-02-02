from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
def index(request):
    return HttpResponse('sunck is a good')
def detail(request,num):
    return HttpResponse("detail-%s"%num)

from .models import Grades,Students
def grades(request):
    ##去模板里面取数据
    gradesList = Grades.objects.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/grades.html',{"grades":gradesList})##grades 是模板中的定义的变量

def students(request):
    ##去模板里面取数据
    studentsList = Students.objects.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentsList})##grades 是模板中的定义的变量

def gradesStudents(request,num):
    ##获得对应的班级对象
    grade = Grades.objects.get(pk = num)
    #获得班级下的所有学生的对象列表
    studentsList = grade.students_set.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentsList})##grades 是模板中的定义的变量

