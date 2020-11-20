import { env, Platform } from '../index';
import { resolve, basename } from 'path';

export function getProjectRootPath(): string {
	// todo: find actual path?

	return process.cwd();
	//__dirname
}

export function getAbsoluteDistPath() {
	return resolve(getProjectRootPath(), getDistPath());
}

export function getEntryPath() {
	const packageJson = getPackageJson();

	return resolve(packageJson.main);
}

export function getDistPath() {
	if (env.ios) {
		const appName = basename(getProjectRootPath());
		return `platforms/ios/${appName}/app`;
	}

	if (env.android) {
		return `platforms/android/app/src/main/assets/app`;
	}

	// todo: additional platforms
	// perhaps we could combine platform specifics into "plugins"
	// 3rd party platforms would be treated the same
}

export function getPlatform(): Platform {
	if (env?.android) {
		return 'android';
	}

	if (env?.ios) {
		return 'ios';
	}

	// todo: maybe no throw?
	throw new Error('You need to provide a target platform!');
}

interface IPackageJson {
	main?: string;
	dependencies?: {
		[name: string]: string;
	};
	devDependencies?: {
		[name: string]: string;
	};
	// todo: add additional fields as we require them
}

export function getPackageJson() {
	const packageJsonPath = resolve(getProjectRootPath(), 'package.json');

	return require(packageJsonPath) as IPackageJson;
}