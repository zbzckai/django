from django.db import models

# Create your models here.
#定义了一个模型类，
class Grades(models.Model):##继承models.Model模型中的字段就对应勒种的属性
    gname = models.CharField(max_length=20)
    gdate = models.DateTimeField()
    ggirlnum = models.IntegerField()
    gboynum = models.IntegerField()
    isDelete = models.BooleanField(default=False)
    ##重写一下__str__让他不要返回清晰的数据
    def __str__(self):
        return self.gname
class Students(models.Model):
    sname = models.CharField(max_length=20)
    sgender = models.BooleanField(default=True)
    sage = models.IntegerField()
    scontent = models.CharField(max_length=20)
    isDelete = models.BooleanField(default=False)
    ##g关联外键，学生要对应班级
    sgrade = models.ForeignKey('Grades')
    def __str__(self):
        return self.sname