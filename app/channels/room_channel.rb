class RoomChannel < ApplicationCable::Channel

  # 1.バックエンドからフロントエンドを監視
  def subscribed
    stream_from "room_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    message = Message.create!(content: data['message'])
    template = ApplicationController.renderer.render(partial: 'messages/message', locals: {message: message})
    # バックエンドからフロントエンドRoomChannel(.js)にデータを送りますよ(->.js received)
    ActionCable.server.broadcast 'room_channel', template
  end
end
