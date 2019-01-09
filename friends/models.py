from django.db import models
from clients.models import Client


class Friend(models.Model):
    creator = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='creator')
    friend = models.ForeignKey(Client, on_delete=models.CASCADE)

    def __str__(self):
        return self.creator.name + ' ' + self.friend.name