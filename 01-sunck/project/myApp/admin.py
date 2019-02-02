from django.contrib import admin

# Register your models here.  将model里面的表注册到这里面
from .models import Grades,Students
#注册
class StudentsInfo(admin.TabularInline):##TabularInline,StackedInline 两种的显示方式不同而已
    model = Students
    extra = 2 ##创建一个班级的时候创造两个学生
class GradesAdmin(admin.ModelAdmin):
    inlines = [StudentsInfo]
    #列表页属性
    list_display = ['pk','gname','gdate','gboynum','ggirlnum','isDelete']
    list_filter = ['gname']
    search_fields = ['gname']
    list_per_page = 1##多少行分一页
    #添加、修改页属性
    #fields = ['isDelete','gname','gdate','gboynum','ggirlnum']
    fieldsets = [("num",{"fields":['ggirlnum','gboynum']}),("base",{"fields":["gname","gdate"]}),]
admin.site.register(Grades,GradesAdmin)
@admin.register(Students)
class StudentsAdmin(admin.ModelAdmin):
    def gender(self):
        if self.sgender:
            return "男"
        else:
            return "女"
    ##设置列名称
    gender.short_description = "性别"
    list_display = ['pk', 'sname', 'sgrade', 'sage', gender, 'scontent','isDelete']
    list_per_page = 5  ##多少行分一页
    #执行动作的位置
    actions_on_bottom = True
    actions_on_top = False
#admin.site.register(Students,StudentsAdmin)