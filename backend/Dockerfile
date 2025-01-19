FROM ruby:3.2.2

# Create app directory
WORKDIR /app

# Copy Gemfiles first for caching
COPY Gemfile Gemfile.lock ./
RUN bundle install

# Copy the rest of the Rails app
COPY . /app

# Expose Rails default port (optional, for local Docker usage)
EXPOSE 3000

# Default command to start Rails server (adjust to your needs)
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0"]
