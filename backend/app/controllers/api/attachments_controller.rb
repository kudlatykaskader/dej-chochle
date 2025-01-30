module Api
  class AttachmentsController < ApplicationController
    def destroy
      @post = Post.find(params[:post_id])
      @attachment = @post.attachments.find(params[:id])
      if @attachment.purge
        render json: { message: 'Attachment deleted successfully' }, status: :ok
      else
        render json: { error: 'Failed to delete attachment' }, status: :unprocessable_entity
      end
    end
  end
end