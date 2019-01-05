from django.db import models
from django.utils.translation import ugettext_lazy as _
from clients.models import Client


ANIMALS = (
    ('Dog', _('Dog')),
    ('Cat', _('Cat')),
)


class Pet(models.Model):
    birthday = models.DateField(blank=True)
    name = models.CharField(max_length=20, default='')
    kind = models.CharField(max_length=20, choices=ANIMALS)
    owner = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.TextField(blank=True)

    class Meta:
        ordering = ('birthday',)

    def __str__(self):
        return self.name
