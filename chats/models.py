from django.db import models
from django.utils.translation import ugettext_lazy as _
from clients.models import Client


class Chat(models.Model):
    first_user = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='first_user')
    second_user = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='second_user')
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('first_user', 'second_user')

    def __str__(self):
        return self.first_user.username + ' with ' + self.second_user.username
