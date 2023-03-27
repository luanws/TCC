import subprocess
import sys
from contextlib import suppress
from typing import Dict, List


def get_installed_packages() -> List[str]:
    return subprocess.check_output(['pip', 'freeze']).decode('utf-8').splitlines()


def install_package(package: str):
    with suppress(Exception):
        subprocess.call(['pip', 'install', package])


def install_packages(packages: List[str]):
    for package in packages:
        install_package(package)


def get_packages(filename: str):
    with open(filename, 'rb') as file:
        content = file.read().decode('utf-16')
        return content.splitlines()


def save_packages(filename: str, packages: List[str]):
    with open(filename, 'w') as file:
        file.write('\n'.join(packages))


def save_log(filename: str, packages_dict: Dict[str, List[str]]):
    with open(filename, 'w') as file:
        for title, packages in packages_dict.items():
            if len(packages) == 0:
                continue
            file.write(f'{title}\n')
            file.write('\n'.join(packages))
            file.write('\n\n')


def get_flags_from_args(args: List[str]) -> Dict[str, str]:
    flags: Dict[str, str] = {}
    for arg in args:
        if arg.startswith('-'):
            if '=' in arg:
                key, value = arg.split('=')
                flags[key] = value
            else:
                flags[arg] = ''
            args.remove(arg)
    return flags


def only_name(package: str) -> str:
    return package.split('==')[0]


def only_names(packages: List[str]) -> List[str]:
    return [only_name(package) for package in packages]


if __name__ == '__main__':
    args = sys.argv[1:]
    flags = get_flags_from_args(args)
    filename = args[0]
    packages = get_packages(filename)
    if '-lo' not in flags.keys():
        install_packages(packages)
    installed_packages = get_installed_packages()
    not_installed_packages = [p for p in packages if only_name(p) not in only_names(installed_packages)]
    updated_packages = [p for p in packages if p not in installed_packages and only_name(
        p) in only_names(installed_packages)]
    extra_packages = [p for p in installed_packages if only_name(p) not in only_names(packages)]
    success_packages = [p for p in packages if p in installed_packages]
    save_log(f'{filename}.log', {
        'Success packages'.upper(): success_packages,
        'Updated packages'.upper(): updated_packages,
        'Extra packages'.upper(): extra_packages,
        'Not installed packages'.upper(): not_installed_packages,
    })