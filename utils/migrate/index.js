/* eslint-disable no-console */

import { readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import 'dotenv/config';
import GhostAdminAPI from '@tryghost/admin-api';

const STAGING = 'staging';
const PRODUCTION = 'production';

const clientStaging = new GhostAdminAPI({
    url: process.env.STAGING_API_URL,
    key: process.env.STAGING_API_KEY_ADMIN,
    version: 'v5.126.0',
});

const clientProduction = new GhostAdminAPI({
    url: process.env.PRODUCTION_API_URL,
    key: process.env.PRODUCTION_API_KEY_ADMIN,
    version: 'v5.126.0',
});

const getPages = (target) => {
    const normalizedTarget = target.toLowerCase();
    const client =
        normalizedTarget === STAGING ? clientStaging : clientProduction;
    const dataPath = join(process.cwd(), `tmp/${normalizedTarget}.json`);
    const settingsPath = join(process.cwd(), 'config/settings.json');
    const settings = JSON.parse(readFileSync(settingsPath));
    const targetSlugs = settings.slugs.join(',');

    console.log(`Fetching data from ${normalizedTarget} ...\n`);

    return new Promise((resolve, reject) => {
        client.pages
            .browse({ filter: `slug:[${targetSlugs}]` })
            .then((pages) => {
                const jsonString = `{ "pages": ${JSON.stringify(pages)} }`;
                writeFileSync(dataPath, jsonString, { flag: 'a' });
                resolve();
            })
            .catch((e) => reject(e));
    });
};

const cleanTmpFile = (target) => {
    const relativePath = `tmp/${target.toLowerCase()}.json`;

    console.log(`Removing "${relativePath}"...\n`);
    rmSync(join(process.cwd(), relativePath));
};

getPages(STAGING).then(() => {
    getPages(PRODUCTION)
        .then(() => {
            cleanTmpFile(STAGING);
        })
        .then(() => {
            cleanTmpFile(PRODUCTION);
        });
});
