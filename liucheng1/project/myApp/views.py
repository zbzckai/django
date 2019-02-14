from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def index(request):
    return HttpResponse('sunck is a good')
from .models import Grades,Students
def grades(request):
    ##去模板里面取数据
    gradesList = Grades.objects.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/grades.html',{"grades":gradesList})##grades 是模板中的定义的变量
def students(request):
    ##去模板里面取数据
    studentList = Students.stuObj2.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentList})##grades 是模板中的定义的变量
def gradesStudents(request,num):
    ##获得对应的班级对象
    grade = Grades.objects.get(pk = num)
    #获得班级下的所有学生的对象列表
    studentsList = grade.students_set.all()
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentsList})##grades 是模板中的定义的变量
def addstudent(request):
    grade = Grades.objects.get(pk = 1)
    stu = Students.createStudent('zhangkai',34,True,'wojiaozhangkai',grade)
    stu.save()
    return HttpResponse('sss')
def addstudent2(request):
    grade = Grades.objects.get(pk = 1)
    stu = Students.stuObj2.creteStudent('chenqi',34,True,'chenqi',grade)
    stu.save()
    return HttpResponse('sss')
def students2(request):
    ##去模板里面取数据
    studentList = Students.stuObj2.all()[0:5]
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentList})##grades 是模板中的定义的变量
##分页显示学生
def stupage(request,page):
    ##去模板里面取数据
    num1 = (int(page)-1) * 3
    num2 = (int(page)) * 3
    studentList = Students.stuObj2.all()[num1:num2]
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentList})##grades 是模板中的定义的变量
from django.db.models import Min,Max,F,Q
def studentsearch(request):
    ##去模板里面取数据
    #studentList = Students.stuObj2.filter(sname__startswith='z', sname__endswith='1')
    grade = Grades.objects.filter(students__scontent__contains ='zhang1')
    studentList = Students.stuObj2.filter(~Q(pk__lte=9))
    maxage = Students.stuObj2.aggregate(Max('sage'))
    print(grade)
    ##将数据传递给模板，模板在渲染页面，再将渲染好的页面返回给浏览器
    return render(request,'myApp/students.html',{"students":studentList})##grades 是模板中的定义的变量
def grades1(request):
    g = Grades.objects.filter(ggirlnum__gt = F('gboynum'))
    print(g)
    return HttpResponse('ssss')