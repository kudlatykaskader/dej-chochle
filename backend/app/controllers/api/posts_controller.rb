module Api
  class PostsController < ApplicationController
    before_action :set_post, only: :show

    def index
      @posts = Post.with_attached_attachments.order(created_at: :desc)
      render json: @posts.map { |post| post_data(post) }
    end

    def show
      render json: post_data(@post)
    end

    def create
      @post = Post.new(post_params)

      if @post.save
        if params[:post][:attachments]
          params[:post][:attachments].each do |attachment|
            @post.attachments.attach(attachment)
          end
        end
        render json: post_data(@post), status: :created
      else
        render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def set_post
      @post = Post.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Post not found" }, status: :not_found
    end

    def post_params
      params.require(:post).permit(:title, :content, attachments: [])
    end

    def post_data(post)
      {
        id: post.id,
        title: post.title,
        content: post.content,
        attachments: post.attachments.map do |attachment|
          blob = attachment.blob
          {
            url: generate_presigned_url(attachment),
            type: blob.content_type,
            filename: blob.filename.to_s
          }
        end,
        created_at: post.created_at,
        updated_at: post.updated_at
      }
    end

    def generate_presigned_url(attachment)
      Rails.application.routes.url_helpers.rails_blob_url(
        attachment,
        only_path: false,
        expires_in: 1.hour,
        disposition: "inline"
      )
    end
  end
end
