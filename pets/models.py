from django.db import models
from django.utils.translation import ugettext_lazy as _
from clients.models import Client


ANIMALS = (
    ('Dog', _('Dog')),
    ('Cat', _('Cat')),
)

GENDERS = (
    ('Male', _('Male')),
    ('Female', _('Female')),
)


class Pet(models.Model):
    birthday = models.DateField(blank=True)
    name = models.CharField(max_length=20, default='',
                            error_messages={
                                'blank': _('This field may not be blank.'),
                            })
    kind = models.CharField(max_length=20, choices=ANIMALS,
                            error_messages={
                                'blank': _('This field may not be blank.'),
                            })
    gender = models.CharField(max_length=20, choices=GENDERS,
                              error_messages={
                                  'blank': _('This field may not be blank.'),
                              })
    breed = models.CharField(max_length=30, error_messages={
                                'blank': _('This field may not be blank.'),
                             })
    owner = models.ForeignKey(Client, on_delete=models.CASCADE)
    description = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='pets', blank=True)

    class Meta:
        ordering = ('birthday',)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if self.avatar == '':
            self.avatar = 'pets/' + self.kind + '.png'
        super(Pet, self).save(*args, **kwargs)