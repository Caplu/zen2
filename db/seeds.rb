if Organization.find_by_name('Zen').blank?
  zen = Organization.create!(name: 'Zen', slug: 'zentest')
  zen.update!(slug: 'zen')

  zen.users.create!(first_name: "Pawel", last_name: "Niewiadomski", username: "pin", password: "password", confirmed_at: Time.now, email: "11110000b@gmail.com")

  project_a = zen.projects.create!(name: "Project A", key: "PA")
  project_b = zen.projects.create!(name: "Project B", key: "PB")

  project_a.issues.create!(summary: "This is a test issue")
  project_a.issues.create!(summary: "Please fix this before releasing")

  project_b.issues.create!(summary: "Issue from another project")
end
