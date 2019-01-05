from django.db import models
from django.utils.translation import ugettext_lazy as _


class Client(models.Model):
    registered = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=20, unique=True, default='',
                                error_messages={
                                    'unique': _('A user with that username already exists.'),
                                })
    name = models.CharField(max_length=20, default='',
                            error_messages={
                                'blank': _('This field may not be blank.'),
                            })
    surname = models.CharField(max_length=20, default='',
                               error_messages={
                                   'blank': _('This field may not be blank.'),
                               })
    address = models.CharField(max_length=100, blank=True, default='')
    password_hash = models.IntegerField()

    class Meta:
        ordering = ('registered',)

    def __str__(self):
        return self.username
