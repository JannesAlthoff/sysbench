import yaml
import jinja2

DB_FILE = 'database.yml'
FIELDS_FILE = 'fields.yml'
TEMPLATE_DIR = 'templates/'
OUTPUT_FILE = 'index.html'

def main():
    '''Build static HTML page from YAML data and Jinja2 templates'''
    with open(FIELDS_FILE) as f:
        fields = yaml.safe_load(f)
    with open(DB_FILE) as f:
        data = yaml.safe_load(f)

    jinja_env = jinja2.Environment(loader=jinja2.FileSystemLoader(TEMPLATE_DIR))
    template = jinja_env.get_template('index.html.j2')

    with open(OUTPUT_FILE, 'w') as output:
        output.write(
            template.render(fields=fields, data=data)
        )

if __name__ == '__main__':
    main()
