from django.db import models

# Create your models here.
class Grades(models.Model):##继承models.Model模型中的字段就对应表种的属性
    gname = models.CharField(max_length=20)
    gdate = models.DateTimeField()
    ggirlnum = models.IntegerField()
    gboynum = models.IntegerField()
    isDelete = models.BooleanField(default=False)
    class Meta:
        db_table = "grades"
        ordering = ['id']
class StudentsManager(models.Manager):
    def get_queryset(self):
        ##super 继承
        return super(StudentsManager,self).get_queryset().filter(isDelete = False)
    def creteStudent(self,name,age,gender,content,grade,isD = False):
        stu = self.model()
        stu.sname = name
        stu.sage = age
        stu.sgender = gender
        stu.scontent = content
        stu.sgrade = grade
        return stu
        print(type(stu))


class Students(models.Model):
    ##自定义模型管理器，stuobj,如果自定义了那么object就不存在了
    stuObj = models.Manager()
    stuObj2 = StudentsManager()
    sname = models.CharField(max_length=20)
    sgender = models.BooleanField(default=True)
    sage = models.IntegerField()
    scontent = models.CharField(max_length=20)
    isDelete = models.BooleanField(default=False)
    ##g关联外键，学生要对应班级
    sgrade = models.ForeignKey('Grades')
    class Meta:
        db_table = "students"
        ordering = ['-id']
    @classmethod##加上这个下面会默认用cls代表students，如果不加则会直接用Students,类方法
    def createStudent(cls,name,age,gender,content,grade,isD = False):##cls 代表的就是Students
        stu = cls(sname = name ,sage=age,sgender=gender,scontent=content,sgrade=grade,isDelete=isD)
        return stu