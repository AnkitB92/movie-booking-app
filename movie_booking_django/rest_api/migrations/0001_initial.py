# Generated by Django 4.0.10 on 2024-08-09 16:54

from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('name', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(3)])),
                ('username', models.CharField(max_length=30, unique=True, validators=[django.core.validators.MinLengthValidator(5)])),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('mobile', models.CharField(blank=True, max_length=12, validators=[django.core.validators.RegexValidator(message='Mobile number must be 10 digits.', regex='^\\d{10}$')])),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('address', models.TextField(blank=True)),
                ('is_active', models.BooleanField(default=True)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_superuser', models.BooleanField(default=False)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(3)])),
                ('description', models.CharField(max_length=150, validators=[django.core.validators.MinLengthValidator(20)])),
                ('release_date', models.DateField()),
                ('genre', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(3)])),
                ('duration', models.IntegerField(validators=[django.core.validators.MinValueValidator(30), django.core.validators.MaxValueValidator(200)])),
                ('poster', models.URLField()),
                ('rating', models.FloatField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(10)])),
                ('starring_actor', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(3)])),
                ('director', models.CharField(max_length=100, validators=[django.core.validators.MinLengthValidator(3)])),
                ('language', models.CharField(max_length=50, validators=[django.core.validators.MinLengthValidator(3)])),
                ('tomato_meter', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)])),
                ('audience_meter', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)])),
            ],
        ),
        migrations.CreateModel(
            name='Ticket',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cinema', models.CharField(max_length=100)),
                ('movie', models.CharField(max_length=50)),
                ('seats', models.JSONField()),
                ('num_seats', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('schedule', models.TimeField()),
                ('show_date', models.DateField()),
                ('ticket_price', models.FloatField(validators=[django.core.validators.MinValueValidator(0)])),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_tickets', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Cinema',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('city', models.CharField(max_length=50)),
                ('location', models.TextField()),
                ('movies', models.ManyToManyField(related_name='cinemas', to='rest_api.movie')),
            ],
        ),
        migrations.AddField(
            model_name='user',
            name='favorite_cinemas',
            field=models.ManyToManyField(blank=True, to='rest_api.cinema'),
        ),
        migrations.AddField(
            model_name='user',
            name='groups',
            field=models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions'),
        ),
    ]