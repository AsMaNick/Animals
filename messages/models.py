from django.db import models
from django.utils.translation import ugettext_lazy as _
from chats.models import Chat
from clients.models import Client


class Message(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    from_user = models.ForeignKey(Client, on_delete=models.CASCADE)
    message = models.TextField(max_length=20000,
                               error_messages={
                                   'blank': _('This field may not be blank.'),
                               })

    class Meta:
        ordering = ('timestamp',)

    def __str__(self):
        return str(self.chat.id) + '.' + self.from_user.username + ': ' + self.message
