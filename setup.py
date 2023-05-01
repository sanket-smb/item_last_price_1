# -*- coding: utf-8 -*-
from setuptools import setup, find_packages

with open('requirements.txt') as f:
	install_requires = f.read().strip().split('\n')

# get version from __version__ variable in item_last_price/__init__.py
from item_last_price import __version__ as version

setup(
	name='item_last_price',
	version=version,
	description='Item Last Sold Price',
	author='SMB',
	author_email='smb@gmail.com',
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
