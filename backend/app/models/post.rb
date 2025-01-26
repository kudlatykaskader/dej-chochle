class Post < ApplicationRecord
  has_many_attached :attachments

  validates :title, :content, presence: true
  validates :title, :content, format: {
    with: /\A[^\u0000-\u001F\u007F-\u009F<>]+\z/,
    message: 'can only contain Unicode characters and cannot include HTML tags'
  }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email address' }, if: -> { email_notifications }
  validates :phone_number, numericality: { only_integer: true, message: 'must contain only numbers' }, length: { is: 9, message: 'must be exactly 9 digits long' }, if: -> { phone_notifications }
  # TODO: disable it for the time being - enable when in production
  # validate :one_post_per_minute
  validate :validate_attachments

  scope :for_email_notifications, -> { where(email_notifications: true) }
  scope :for_phone_notifications, -> { where(phone_notifications: true) }

  private

  def one_post_per_minute
    recent_post = Post.where("created_at >= ?", 1.minute.ago).exists?
    errors.add(:base, "You can only create one post per minute") if recent_post
  end

  def validate_attachments
    if attachments.count > 5
      errors.add(:attachments, "You can upload up to 5 files only")
    end

    attachments.each do |attachment|
      unless attachment.content_type.in?(%w[image/jpeg image/png video/mp4])
        errors.add(:attachments, "Only JPEG, PNG images and MP4 videos are allowed")
      end
    end
  end
end
