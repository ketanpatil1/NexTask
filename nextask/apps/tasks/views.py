from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required

from .models import Section, Task
from .forms import (
    CreateSectionForm,
    CreateTaskForm,
    DeleteSectionForm,
    DeleteTaskForm,
    UpdateTaskForm,
)


# Create your views here.
def home(request):
    return render(request, "home.html")


@login_required
def main(request):
    sections = Section.objects.filter(user=request.user)
    tasks = Task.objects.filter(user=request.user)

    add_section_form = CreateSectionForm()
    add_task_form = CreateTaskForm()
    delete_section_form = DeleteSectionForm()
    delete_task_form = DeleteTaskForm()
    update_task_form = UpdateTaskForm()

    if request.method == "POST":
        if "create_section" in request.POST:
            add_section_form = CreateSectionForm(request.POST)
            if add_section_form.is_valid():
                section = add_section_form.save(commit=False)
                section.user = request.user
                section.save()

        if "create_task" in request.POST:
            add_task_form = CreateTaskForm(request.POST)
            if add_task_form.is_valid():
                task = add_task_form.save(commit=False)
                task.user = request.user
                task.save()

        if "delete_section" in request.POST:
            delete_section_form = DeleteSectionForm(request.POST)
            if delete_section_form.is_valid():
                section = get_object_or_404(
                    sections, pk=request.POST.get("delete_section")
                )
                section.delete()

        if "delete_task" in request.POST:
            delete_task_form = DeleteTaskForm(request.POST)
            if delete_task_form.is_valid():
                task = get_object_or_404(tasks, pk=request.POST.get("delete_task"))
                task.delete()

        if "update_task" in request.POST:
            update_task_form = UpdateTaskForm(request.POST)
            if update_task_form.is_valid():
                task = get_object_or_404(tasks, pk=request.POST.get("task_id"))
                task.title = request.POST.get("title")
                task.description = request.POST.get("description")
                task.priority = request.POST.get("priority")
                if request.POST.get("goal_date"):
                    task.goal_date = request.POST.get("goal_date")
                else:
                    task.goal_date = None
                if request.POST.get("goal_time"):
                    task.goal_time = request.POST.get("goal_time")
                else:
                    task.goal_time = None
                task.save()

        return redirect("main")

    context = {
        "add_section_form": add_section_form,
        "add_task_form": add_task_form,
        "delete_section_form": delete_section_form,
        "delete_task_form": delete_task_form,
        "update_task_form": update_task_form,
        "sections": sections,
        "tasks": tasks,
    }
    return render(request, "tasks/main.html", context=context)
