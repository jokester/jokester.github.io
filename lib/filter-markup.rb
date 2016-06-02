require 'nanoc/filters'

module Nanoc::Filters

  class Markup < Nanoc::Filter
    def run(content, params = {})
      "compiled content from markup"
    end
  end

  Nanoc::Filter.register '::Nanoc::Filters::Markup', :markup

end
