module ResponseHelpers
	def json
		JSON.parse(response.body)
	end
end
