from django.contrib import admin
from .models import Lead

@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    search_fields = ["first_name", "last_name"]
    list_display = ["first_name" ,"last_name", "phone", "email", "description", "created_by", "team", "assigned_to"]
    list_filter = ["team"]

'''
admin.site.register(Lead)
'''