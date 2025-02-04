import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
@Injectable()
export class S3Service {
  private s3Client: S3Client;
  constructor(private configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.get(`AWS_REGION`),
      credentials: {
        accessKeyId: this.configService.get(`AWS_ACCESS_KEY_ID`),
        secretAccessKey: this.configService.get(`AWS_SECRET_ACCESS_KEY`),
      },
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = this.configService.get(`AWS_S3_BUCKET`);
    const key = `images/${Date.now()}`;

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    });

    try {
      await this.s3Client.send(command);
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    } catch (error) {
      throw new Error(`Failed to Upload File to s3 ${error.message}`);
    }
  }
}
