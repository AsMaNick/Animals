from django.db import models
from django.utils.translation import ugettext_lazy as _
from pets.models import Pet


class LogFromBracelet(models.Model):
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(error_messages={
                                         'blank': _('This field may not be blank.'),
                                     })
    temperature = models.FloatField(error_messages={
                                        'blank': _('This field may not be blank.'),
                                    })
    pulse = models.FloatField(error_messages={
                                  'blank': _('This field may not be blank.'),
                              })

    class Meta:
        ordering = ('timestamp',)

    def __str__(self):
        return 'pet: {}, timestamp: {}, temperature: {}, pulse: {}'.format(self.pet,
                                                                           self.timestamp,
                                                                           self.temperature,
                                                                           self.pulse)