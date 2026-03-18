from django.db import models
from django.contrib.auth.models import User
from PIL import Image


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    avatar = models.ImageField(default="default.png", upload_to="profile_avatars")

    def __str__(self):
        return f"{self.user.username} Profile"

    def save(self, *args, **kwargs):
        # save the profile first
        super().save(*args, **kwargs)

        # resize the image
        img = Image.open(self.avatar.path)

        width, height = img.size

        if height > width:
            left = 0
            top = height / 2 - width / 2
            right = width
            bottom = height / 2 + width / 2
            img = img.crop((left, top, right, bottom))
        elif height < width:
            left = width / 2 - height / 2
            top = 0
            right = width / 2 + height / 2
            bottom = height
            img = img.crop((left, top, right, bottom))

        if height > 300 or width > 300:
            output_size = (300, 300)
            img.thumbnail(output_size)
        img.save(self.avatar.path)
