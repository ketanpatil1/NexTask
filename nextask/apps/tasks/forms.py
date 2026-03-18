from django import forms

from .models import Section, Task


class CreateSectionForm(forms.ModelForm):
    create_section = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = Section
        fields = ["title"]


class CreateTaskForm(forms.ModelForm):
    create_task = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = Task
        fields = [
            "title",
            "description",
            "priority",
            "goal_date",
            "goal_time",
            "section",
        ]

    def __init__(self, *args, **kwargs):
        super(CreateTaskForm, self).__init__(*args, **kwargs)
        self.fields["title"].widget = forms.TextInput()
        self.fields["description"].widget = forms.Textarea()
        self.fields["priority"].widget = forms.RadioSelect(
            choices=[
                (1, "High"),
                (2, "Medium"),
                (3, "Low"),
                (4, "None"),
            ],
        )
        self.fields["goal_date"].widget = forms.DateInput(attrs={"type": "date"})
        self.fields["goal_time"].widget = forms.TimeInput(attrs={"type": "time"})
        self.fields["section"].widget = forms.HiddenInput()


class DeleteSectionForm(forms.Form):
    delete_section = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = Section
        fields = ["id"]

    # def __init__(self, *args, **kwargs):
    #     super(DeleteSectionForm, self).__init__(*args, **kwargs)
    #     self.fields['id'].widget = forms.HiddenInput()


class DeleteTaskForm(forms.Form):
    delete_task = forms.BooleanField(widget=forms.HiddenInput, initial=True)

    class Meta:
        model = Task
        fields = ["id"]


class UpdateTaskForm(forms.ModelForm):
    update_task = forms.BooleanField(widget=forms.HiddenInput, initial=True)
    task_id = forms.IntegerField(widget=forms.HiddenInput)

    class Meta:
        model = Task
        fields = [
            "title",
            "description",
            "priority",
            "goal_date",
            "goal_time",
        ]

    def __init__(self, *args, **kwargs):
        super(UpdateTaskForm, self).__init__(*args, **kwargs)
        self.fields["title"].widget = forms.TextInput()
        self.fields["description"].widget = forms.Textarea()
        self.fields["priority"].widget = forms.RadioSelect(
            choices=[
                (1, "High"),
                (2, "Medium"),
                (3, "Low"),
                (4, "None"),
            ],
            attrs={"id": "update_task_priority"},
        )
        self.fields["goal_date"].widget = forms.DateInput(attrs={"type": "date"})
        self.fields["goal_time"].widget = forms.TimeInput(attrs={"type": "time"})
