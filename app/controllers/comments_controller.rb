class CommentsController < ApplicationController
  def index
  end

  def new

  end

  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      flash[:notice] = "Thanks for commenting"
      redirect_to root_path
    else
      flash[:notice] = "Unable to comment... try again"
      redirect_to root_path
    end 
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private 
    def comment_params
      params.require(:comment).permit(:name, :body, :flag, :report_id)
    end
end
