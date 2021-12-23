# Generated by Django 3.1.4 on 2021-12-23 09:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('team', '0002_auto_20211222_1526'),
    ]

    operations = [
        migrations.CreateModel(
            name='Lead',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(max_length=100)),
                ('last_name', models.CharField(max_length=100)),
                ('phone', models.IntegerField()),
                ('email', models.EmailField(max_length=254)),
                ('description', models.CharField(blank=True, max_length=10000)),
                ('created_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='create_lead', to=settings.AUTH_USER_MODEL)),
                ('team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='team_lead', to='team.team')),
            ],
        ),
    ]
