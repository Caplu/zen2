class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  before_action :authenticate_user!

  include Pundit

  # Make sure authorization was performed
  after_action :verify_authorized
end
