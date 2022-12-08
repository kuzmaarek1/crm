from django.contrib import admin
from lead.models import Lead
from client.models import Client
from .models import Team

class LeadInline(admin.StackedInline):
    model=Lead

class ClientInline(admin.StackedInline):
    model=Client

@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    search_fields = ["name"]
    list_display = ["name", "description", "created_by", "get_members"]
    list_filter = ["name"]
    inlines=[LeadInline, ClientInline]
    
    def get_members(self, obj):
        return "\n".join([p.username for p in obj.members.all()])