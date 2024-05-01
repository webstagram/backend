locals {
  environment_variable_settings = [
    for env_key, env_value in var.environment_variables : {
      namespace = "aws:elasticbeanstalk:application:environment"
      name      = env_key
      value     = env_value
    }
  ]
}