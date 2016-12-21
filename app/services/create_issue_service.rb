class CreateIssueService < ApplicationService

  att :issue, Hash
  att :project, Project

  def call
    result = try! do
      issue = Issue.new(@issue.slice('summary', 'description').merge(project_id: @project.id))

      authorize issue, :create?

      issue.save!

      OpenStruct.new(issue: issue)
    end

    if block_given?
      yield(result)
    else
      result
    end
  end
end