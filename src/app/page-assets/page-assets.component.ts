import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LogosEnum} from '@src/models/logos.enum';

@Component({
  templateUrl: './page-assets.component.html',
  styleUrls: ['./page-assets.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageAssetsComponent implements OnInit {
  projectName = localStorage.getItem('project-name');
  logos = LogosEnum;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    return this.http.get(`http://localhost:3000/api/upload`).subscribe();
  }

  onFileSelected(event: any, fileName: string) {
    const file: File = event.target.files[0];

    if (file) {
      // this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file, `${this.projectName}|${fileName}`);

      this.http.post("http://localhost:3000/api/upload", formData).subscribe();
    }
  }
}
