# Generated by Django 3.0.5 on 2020-04-22 12:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='recipe',
            name='creation_date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='difficulty',
            field=models.CharField(choices=[('1', 'Simple'), ('2', 'Modéré'), ('3', 'Difficile')], max_length=1),
        ),
        migrations.AlterField(
            model_name='recipe',
            name='update_date',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
