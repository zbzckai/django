from django.db import models

# Create your models here.
class Grades(models.Model):##继承models.Model模型中的字段就对应表种的属性
    gname = models.CharField(max_length=20)
    gdate = models.DateTimeField()
    ggirlnum = models.IntegerField()
    gboynum = models.IntegerField()
    isDelete = models.BooleanField(default=False)
class Students(models.Model):
    sname = models.CharField(max_length=20)
    sgender = models.BooleanField(default=True)
    sage = models.IntegerField()
    scontent = models.CharField(max_length=20)
    isDelete = models.BooleanField(default=False)
    ##g关联外键，学生要对应班级
    sgrade = models.ForeignKey('Grades',on_delete=models.CASCADE)
class Teacher_1(models.Model):
    term = models.CharField(max_length=30)
    cla_id = models.CharField(max_length=20)
    cla_Name = models.CharField(max_length=20)
    gra_Name = models.CharField(max_length=20)
    sub_id = models.CharField(max_length=30)
    sub_Name = models.CharField(max_length=20)
    bas_id = models.CharField(max_length=20)
    bas_Name = models.CharField(max_length=20)
