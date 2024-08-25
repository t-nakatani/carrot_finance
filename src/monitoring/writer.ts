import dotenv from 'dotenv';
import { InfluxDBClient, Point } from '@influxdata/influxdb3-client'

dotenv.config();

export class DBWriter {
    private client: InfluxDBClient;
    private database: string;

    constructor(database: string) {
        const token = process.env.INFLUXDB_TOKEN as string;
        const influxEndpoint = process.env.INFLUXDB_ENDPOINT as string;

        this.database = database;
        this.client = new InfluxDBClient({ host: influxEndpoint, token: token });
    }

    async writeData(measurement: string, fieldName: string, value: number): Promise<void> {
        const point: Point = Point.measurement(measurement).setIntegerField(fieldName, value);
        await this.client.write(point, this.database);
    }
}
